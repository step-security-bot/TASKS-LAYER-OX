# first install Flask using "pip install Flask" command
# To run flask server use "py -m flask run" command

import statistics
from flask import Flask, jsonify, request

app = Flask(__name__)
 
class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
 
class GradeAnalyzer:
    def __init__(self, students):
        self.students = students
 
    def calculate_average_grades(self):

        average_grades = []
        for student in self.students:
            average_grades.append(float(statistics.mean([grades['grade'] for grades in student.grades])))
        return average_grades
 
    def calculate_average_subjects(self):
        subject_totals = {}
        subject_averages = []
        students = self.students
        for student in students:
            for grade in student.grades:
                if grade['subject'] not in subject_totals:
                    subject_totals[grade['subject']] = [grade['grade']]
                else:
                    subject_totals[grade['subject']] += [grade['grade']]
        for _,values in subject_totals.items():
            subject_averages.append(float(statistics.mean(values)))

        return subject_averages
 
    def calculate_overall_average(self):
        average_grades = self.calculate_average_grades()
        return statistics.mean(average_grades)
    
    def calculate_std_deviation(self):
        all_grades = [grade["grade"] for student in self.students for grade in student.grades]
        return statistics.stdev(all_grades)
 
    def generate_output(self):
        return {
            "average_grades": self.calculate_average_grades(),
            "average_subjects": self.calculate_average_subjects(),
            "overall_average": self.calculate_overall_average(),
            "std_deviation": self.calculate_std_deviation()
        }
 
# API endpoint for handling POST requests
@app.route('/grade_analysis/', methods=['POST'])
def post_grade_analysis():
    data = request.get_json()
    # Assuming data structure is the same as the provided example
    students_data = [Student(student["name"], student["grades"]) for student in data['student_data']]

    grade_analyzer = GradeAnalyzer(students_data)
    output = grade_analyzer.generate_output()
 
    return jsonify(output)

@app.route('/',methods =['GET'])
def hello():
    data = request.get_json()
    print(data)
    return 'Hello, Flask!'
 
if __name__ == '__main__':
    app.run(debug=True)