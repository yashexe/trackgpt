from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from different origins
DATABASE = 'expenses.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Allows access to columns by name
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL
    )
    ''')
    conn.commit()
    conn.close()

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    try:
        data = request.json
        if not isinstance(data, dict):
            return jsonify({'error': 'Invalid data format'}), 400
        description = data.get('description')
        amount = data.get('amount')
        category = data.get('category')
        if not all([description, amount, category]):
            return jsonify({'error': 'Missing required fields'}), 400
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO expenses (description, amount, category) VALUES (?, ?, ?)
        ''', (description, amount, category))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Expense added successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM expenses')
        rows = cursor.fetchall()
        conn.close()
        expenses = [{
            'id': row['id'],
            'description': row['description'],
            'amount': row['amount'],
            'category': row['category']
        } for row in rows]
        return jsonify(expenses)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()  # Ensure the database is initialized before running the server
    app.run(debug=True)
