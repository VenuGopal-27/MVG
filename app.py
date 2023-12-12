pip install flask
from flask import Flask, jsonify, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'mysecretkey'

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT='465',
    MAIL_USE_SSL=True,
    MAIL_USERNAME='asqag.cutm@gmail.com',
    MAIL_PASSWORD='ibji ymod bwgd zmdo'
)
mail = Mail(app)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    try:
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        subject = request.form['subject']
        recipients = ['asqag.cutm@gmail.com']

        msg = Message("MVG",
                    sender=email,
                    recipients=recipients,
                    body="NEW MESSAGE\n--------------------------\n\n\nSubject: {}\nMessage: {}\n\n From: {}".format(subject,message, name))

        mail.send(msg)
        return jsonify({'status': 'OK'})
    except Exception as e:
        print(f"Error processing form submission: {str(e)}")
        return jsonify({'status': 'Error'}), 500 


app.run(debug=True)
