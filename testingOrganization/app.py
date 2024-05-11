from flask import Flask, render_template, request, redirect, url_for
import pandas as pd

app = Flask(__name__)

student_data = pd.read_csv('merkle_proof_student_data.csv')
authentication_data = pd.read_csv('student_authentication.csv', names=['Id', 'Password'])

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        id = request.form['id']
        password = request.form['password']
        if (id in authentication_data['Id'].values) and \
           (password == authentication_data[authentication_data['Id'] == id]['Password'].values[0]):
            return redirect(url_for('display_data', id=id))
        else:
            return "Invalid credentials. Please try again."
    return render_template('login.html')

@app.route('/display/<id>')
def display_data(id):
    student = student_data[student_data['Id'] == int(id)]
    return render_template('display.html', student=student)

if __name__ == '__main__':
    app.run(debug=True)