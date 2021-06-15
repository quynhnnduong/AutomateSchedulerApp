from flask_restful import request
from flask_restful import Resource
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class GetAllCourses(Resource):
    def get(self):
        result = exec_get_all("SELECT * FROM courses ORDER BY ID")
        result2 = []
        for item in result:
            department = exec_get_one(
                "SELECT * FROM department WHERE ID = '{}'".format(item[1]))
            college = exec_get_one(
                "SELECT * FROM college WHERE ID = '{}'".format(department[1]))
            new_dct = {"name": item[2], "c_desc": item[3],
                       "details": item[4], "department": department[2], "college": college[1]}
            result2.append(new_dct)
        return result2


class GetById(Resource):
    def get(self, id):
       result = exec_get_all(
           "SELECT name, c_desc, details FROM courses WHERE ID = '{}'".format(id))
       result2 = []
       print(result)
       for item in result:
            new_dct = {"name": item[0], "c_desc": item[1], "details": item[2]}
            result2.append(new_dct)
       return result2


class Put(Resource):
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('selected')
        data = parser.parse_args()  # request.get_json(force = True)
        if data['selected'] == 'true':
            exec_commit("UPDATE courses SET selected = 'FALSE' WHERE name = '{}'".format(id))
            return "true"
        if data['selected'] == 'false':
            exec_commit("UPDATE courses SET selected = 'TRUE' WHERE name = '{}'".format(id))
            return "false"


# class Post(Resource):
#     def put(self):
#         result = exec_get_all("SELECT * FROM courses ORDER BY ID")

#     return result
