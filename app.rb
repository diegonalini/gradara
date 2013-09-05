require 'rubygems'
require 'sinatra'
require 'warden'
require 'mongo'
require 'json'
#use Rack::Session::Pool, :expire_after => 1800

DB = Mongo::Connection.new.db("gradaradb", :pool_size => 5, :timeout => 5)

get '/' do
  #haml :index, :attr_wrapper => '"', :locals => {:title => 'haii'}
  send_file File.expand_path('index.html', settings.public_folder)
end

get '/todo' do
  haml :todo, :attr_wrapper => '"', :locals => {:title => 'MongoDB Backed TODO App'}
end


get '/login/:username/:password' do
  # env['rack.session'][:token]="Hello Rack"
  if params[:username] == 'pippo' && params[:password] == 'b' then 
    return {:token => '12345', :username => params[:username]}.to_json
  end
  return {:token => '0', :username =>''}.to_json
end

get '/logout/:token' do
  session.clear
  return {:token => '0', :username =>''}.to_json
end 

get '/islogged/:token' do
  if (params[:token] == '12345') then return {:valid => true}.to_json end
  return {:valid => false}.to_json
end

get '/api/:thing' do
  DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
end

get '/api/:thing/:id' do
  from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
end

post '/api/:thing' do
  oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
  "{\"_id\": \"#{oid.to_s}\"}"
end

delete '/api/:thing/:id' do
  DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id])).to_json
end

put '/api/:thing/:id' do
  a=DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  a.to_s
end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end