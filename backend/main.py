from flask import Flask, request, jsonify
from flask_cors import CORS
from explorer import Explorer

app = Flask(__name__)
user_explorer = Explorer()
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])


@app.route('/status', methods=['GET'])
def status():
    # data = request.get_json()
    # name = data.get('name')
    return jsonify({"status": "Online"}), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data.get('login')
    password = data.get('password')
    if user_explorer.get_user(login, password):
        return jsonify({"login": "success"}), 200
    else:
        return jsonify({"error": "Incorrect login or password"}), 401


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    login = data.get('login')
    password = data.get('password')
    if user_explorer.register_user(login, password):
        return jsonify({"login": "success"}), 200
    else:
        return jsonify({"error": "Such user already exists"}), 401


@app.route("/expenses", methods=['POST'])
def expenses():
    data = request.get_json()
    user = data.get('user')
    if not user_explorer.user_exists(user):
        jsonify({"error": "There is not such user"}), 404
    try:
        return jsonify(user_explorer.expenses(user)), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Something went wrong"}), 500


@app.route("/add_expense", methods=['POST'])
def add_expense():
    data = request.get_json()
    user = data.get('user')
    title = data.get('title')
    category = data.get('category')
    hour = data.get('hour')
    minute = data.get('minute')
    day = data.get('day')
    month = data.get('month')
    year = data.get('year')
    count = data.get('count')
    if user_explorer.add_exp(user, title, category, hour, minute, day, month, year, count):
        return jsonify({"status": "deleted"}), 200
    else:
        return jsonify({"error": "nothing to add"}), 404


@app.route("/edit_expense", methods=['POST'])
def edit_expense():
    data = request.get_json()
    user = data.get('user')
    old_title = data.get('old_title')
    old_category = data.get('old_category')
    old_hour = data.get('old_hour')
    old_minute = data.get('old_minute')
    old_day = data.get('old_day')
    old_month = data.get('old_month')
    old_year = data.get('old_year')
    old_count = data.get('old_count')
    new_title = data.get('new_title')
    new_category = data.get('new_category')
    new_hour = data.get('new_hour')
    new_minute = data.get('new_minute')
    new_day = data.get('new_day')
    new_month = data.get('new_month')
    new_year = data.get('new_year')
    new_count = data.get('new_count')
    if user_explorer.edit_exp(user, old_title, old_category, old_hour, old_minute, old_day,
                              old_month, old_year, old_count, new_title, new_category, new_hour,
                              new_minute, new_day, new_month, new_year, new_count):
        return jsonify({"status": "deleted"}), 200
    else:
        return jsonify({"error": "nothing to edit"}), 404


@app.route("/delete_expense", methods=['POST'])
def delete_expense():
    data = request.get_json()
    user = data.get('user')
    title = data.get('title')
    category = data.get('category')
    hour = data.get('hour')
    minute = data.get('minute')
    day = data.get('day')
    month = data.get('month')
    year = data.get('year')
    count = data.get('count')
    if user_explorer.del_exp(user, title, category, hour, minute, day, month, year, count):
        return jsonify({"status": "deleted"}), 200
    else:
        return jsonify({"error": "nothing to delete"}), 404


@app.route("/categorise_expenses", methods=['POST'])
def categorise_expenses():
    data = request.get_json()
    user = data.get('user')
    negative = data.get('negative')
    categorised = user_explorer.all_exp(user, negative=negative)
    if categorised:
        return jsonify(categorised), 200
    else:
        return jsonify({"error": "No expenses for this user"}), 404


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4444, debug=False, use_reloader=False)
