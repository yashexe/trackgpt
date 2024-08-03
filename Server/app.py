from flask import Flask, render_template, send_from_directory, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS


app = Flask(__name__)

# Route for the simple HTML page
@app.route('/')
def index():
    return "Hello"
    # return render_template('/client/public/index.html')

# Route for the React page
# @app.route('/react')
# def react_page():
#     return render_template('react_page.html')

# Serve the React app's static files
# @app.route('/react-app/<path:path>')
# def serve_react_app(path):
#     return send_from_directory('static/react_app/build', path)

if __name__ == '__main__':
    app.run(debug=True)
