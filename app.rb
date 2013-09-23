require 'rubygems'
require 'sinatra'
require 'warden'
require 'mail'
require 'mongo'
require 'json'
require 'sinatra/security'

DB = Mongo::Connection.new.db("gradaradb", :pool_size => 5, :timeout => 5)

$accessMap={ 'guest'=>{},
            'basic'=>{ 'todos'=>{ 'GET'=>'self', 'PUT'=>'self' , 'POST'=>'self', 'DELETE'=>'self'} },
            'editor'=>{ 'todos'=>{ 'GET'=>'self', 'PUT'=>'self' , 'POST'=>'self', 'DELETE'=>'self'} },
            'admin'=>{ 'todos'=>{ 'GET'=>'self', 'PUT'=>'self' , 'POST'=>'self', 'DELETE'=>'self'} }}

options = { :address              => "smtp.gmail.com",
            :port                 => 587,
            :domain               => 'gmail.com',
            :user_name            => 'naliniandroid',
            :password             => 'ciccione1',
            :authentication       => 'plain',
            :enable_starttls_auto => true  }

Mail.defaults do
  delivery_method :smtp, options
end


def accessControl(role, coll, op)
  begin
    return $accessMap[role][coll][op]
  rescue 
  end
  return 'false'
end

def extendSession(token)
  begin
    DB.collection('tokens').update({'_id' => to_bson_id(token)}, {'$set' => {'expires' => (Time.new().to_i+1800)} })
  rescue 
  end
end

get '/' do
  #haml :index, :attr_wrapper => '"', :locals => {:title => 'haii'}
  send_file File.expand_path('index.html', settings.public_folder)
end




get '/login/:username/:password' do
  # env['rack.session'][:token]="Hello Rack"
  if (DB.collection('users').find({ role: 'admin'}).count == 0)
    DB.collection('users').insert({status: 'active', username: 'admin', password: Sinatra::Security::Password::Hashing.encrypt('test', '123456789012'), role:'admin'})
  end
  user = DB.collection('users').find_one({ username: params[:username], password: Sinatra::Security::Password::Hashing.encrypt(params[:password], '123456789012') })
  if (user!=nil)
    doc={}
    doc['username']=params[:username]
    doc['role']=user["role"]
    doc['expires']=Time.new().to_i+1800
    token=0
    token=DB.collection('tokens').insert(doc) if user['status']=='active'
    return {:token => token.to_s, :username => params[:username], :role => user['role'], :status => user['status']}.to_json
  end
  return {:token => '0', :username =>'', :role => 'guest'}.to_json
end

get '/logout/:token' do
  DB.collection('tokens').remove('_id' => to_bson_id(params[:token]))
  return {:token => '0', :username =>'', :role => 'guest'}.to_json
end 

get '/changepwd/:oldpwd/:pwd' do
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    username=token["username"]
    return DB.collection('users').update({'username' => username, 'password' => Sinatra::Security::Password::Hashing.encrypt(params[:oldpwd], '123456789012')}, {'$set' => {'password' => Sinatra::Security::Password::Hashing.encrypt(params[:pwd], '123456789012')}}).to_json    if (token!=nil && Time.new().to_i<token['expires'])
  rescue 
  end
  return {}.to_json
end 

get '/islogged/:token' do
  return {:valid => false}.to_json if (params[:token]=='0')
  token=DB.collection('tokens').find_one('_id' => to_bson_id(params[:token]))
  if (token!=nil && Time.new().to_i<token['expires']) then return {:valid => true}.to_json end
  return {:valid => false}.to_json
end

get '/existsUsername/:s' do
  k=DB.collection('users').find_one('username' => params[:s])
  return {:exist => true}.to_json if k!=nil
  return {:exist => false}.to_json
end

get '/existsEmail/:s' do
  k=DB.collection('users').find_one('email' => params[:s])
  return {:exist => true}.to_json if k!=nil
  return {:exist => false}.to_json
end

get '/activate/:key' do
  DB.collection('users').update({'confirmkey' => params[:key], 'status' => 'confirm'}, {'$set' => {"status" => "active"}}) 
  redirect '/'
end

post '/register' do
  pwd=Sinatra::Security::Password::Hashing.encrypt(params[:password], '123456789012')
  copy=params.select{|x| x != "password"}
  copy[:password]=pwd
  copy[:role]='basic'
  copy[:status]='confirm'   #disabled , active
  copy[:confirmkey]=('a'..'z').to_a.shuffle[0,14].join
  DB.collection('users').insert(copy)
  mail = Mail.new do
        to copy["email"]
        sender 'noreply@gmail.com' ##associate new account in gmail
        subject 'Gradara account activation'
        body 'To complete activation visit http://localhost:9292/activate/'+copy[:confirmkey]
  end

  Thread.new {
    p mail.deliver!
  }
 
  {:done => 'ok'}.to_json
end


get '/api/:thing' do
  role='guest'
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    role=token["role"]
    username=token["username"]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'GET')
  extendSession(params[:token]) if allow!='false'
  return DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json if allow=='true'
  return DB.collection(params[:thing]).find("username" => username).to_a.map{|t| from_bson_id(t)}.to_json if allow=='self'
  #return {}.to_json
end

get '/api/:thing/:id' do
  role='guest'
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    role=token["role"]
    username=token["username"]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'GET')
  extendSession(params[:token]) if allow!='false'
  return from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json if allow=='true'
  if allow=='self'
    o=from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id])))
    return o.to_json if o["username"]==username    
  end
  {}.to_json
end

post '/api/:thing' do
  role='guest'
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    role=token["role"]
    username=token["username"]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'POST')
  return {}.to_json if username=='' || allow=='false'
  extendSession(params[:token])
  o=JSON.parse(request.body.read.to_s)
  o[:username]=username if allow=='self'
  oid = DB.collection(params[:thing]).insert(o)
  "{\"_id\": \"#{oid.to_s}\"}"
end

delete '/api/:thing/:id' do
  role='guest'
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    role=token["role"]
    username=token["username"]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'DELETE')
  return {}.to_json if username=='' || allow=='false'
  extendSession(params[:token])
  return DB.collection(params[:thing]).remove({'_id' => to_bson_id(params[:id])}).to_json if allow=='true'
  return DB.collection(params[:thing]).remove({'_id' => to_bson_id(params[:id]), 'username' => username}).to_json if allow=='self'
end

put '/api/:thing/:id' do
  role='guest'
  username=''
  begin
    token=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']), "expires" => {"$gt" => Time.new().to_i})
    role=token["role"]
    username=token["username"]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'PUT')
  return {}.to_json if username=='' || allow=='false'
  extendSession(params[:token])
  DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}}).to_s if allow=='true'
  DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id]), 'username' => username}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}}).to_s if allow=='self'
end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end