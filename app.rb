require 'rubygems'
require 'sinatra'
require 'warden'
require 'mongo'
require 'json'
#use Rack::Session::Pool, :expire_after => 1800

DB = Mongo::Connection.new.db("gradaradb", :pool_size => 5, :timeout => 5)

$accessMap={ 'guest'=>{ 'todos'=>{ 'GET'=>true }},
            'basic'=>{},
            'editor'=>{},
            'admin'=>{}}

def accessControl(role, coll, op)
  begin
    return true if accessMap[role][coll][op]==true
  rescue 
  end
  return false
end

get '/' do
  #haml :index, :attr_wrapper => '"', :locals => {:title => 'haii'}
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/login/:username/:password' do
  # env['rack.session'][:token]="Hello Rack"
  if (DB.collection('users').find({ role: 'admin'}).count == 0)
    DB.collection('users').insert({username: 'admin', password: 'test', role:'admin'})
  end
  user = DB.collection('users').find_one({ username: params[:username], password: params[:password]})
  if (user!=nil)
    doc={}
    doc['username']=params[:username]
    doc['role']=user[:role]
    doc['expires']=Time.new().to_i+300
    token=DB.collection('tokens').insert(doc)
    return {:token => token.to_s, :username => params[:username], :role => user['role']}.to_json
  end
  return {:token => '0', :username =>'', :role => 'guest'}.to_json
end

get '/logout/:token' do
  session.clear
  DB.collection('tokens').remove('_id' => to_bson_id(params[:token]))
  return {:token => '0', :username =>'', :role => 'guest'}.to_json
end 

get '/islogged/:token' do
  return {:valid => false}.to_json if (params[:token]=='0')
  token=DB.collection('tokens').find_one('_id' => to_bson_id(params[:token]))
  if (token!=nil && Time.new().to_i<token['expires']) then return {:valid => true}.to_json end
  return {:valid => false}.to_json
end

get '/api/:thing' do
  role='guest'
  begin
    role=DB.collection('tokens').find_one('_id' => to_bson_id(env['HTTP_ACCESS_TOKEN']))[:role]
  rescue 
  end
  allow=accessControl(role, params[:thing], 'GET')
  DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json if allow
end

get '/api/:thing/:id' do
  token=env['HTTP_ACCESS_TOKEN']
  from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
end

post '/api/:thing' do
  token=env['HTTP_ACCESS_TOKEN']
  oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
  "{\"_id\": \"#{oid.to_s}\"}"
end

delete '/api/:thing/:id' do
  token=env['HTTP_ACCESS_TOKEN']
  DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id])).to_json
end

put '/api/:thing/:id' do
  token=env['HTTP_ACCESS_TOKEN']
  a=DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  a.to_s
end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end