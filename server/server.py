from flask import Flask
from flask_restful import Resource, Api


from api.swen_344_db_utils import *
from api.example_api import *
from api.api import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(GetAllCourses,'/coursedata')
api.add_resource(GetById, '/coursedata/int:id')
api.add_resource(Put, '/coursedata/<int:course_id>')
# api.add_resource(Put, '/coursedata/<id>')

# api.add_resource(ExampleApi, '/example_api')
# api.add_resource(TestMessage, '/test_message')


if __name__ == '__main__':
    print("Loading db");
    exec_sql_file('react4_schema.sql');
    print("Starting flask");
    app.run(debug=True), #starts Flask

