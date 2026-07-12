import os
import psycopg2
from flask import Flask, render_template_string

app = Flask(__name__)

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_projects():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute("SELECT id, name, platform, status, notes FROM projects ORDER BY platform, name")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BOS Projects</title>
    <style>
        body { font-family: sans-serif; background: #111; color: #eee; margin: 0; padding: 10px; }
        h1 { color: #0f0; font-size: 1.3em; }
        table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
        th { background: #222; color: #0f0; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #333; }
        tr:nth-child(even) { background: #1a1a1a; }
        .platform { color: #888; font-size: 0.8em; }
        .status-active { color: #0f0; }
        .status-paused { color: #fa0; }
        .status-idea { color: #0af; }
        .status-deferred { color: #f55; }
    </style>
</head>
<body>
    <h1>BOS Project Dashboard</h1>
    <p>{{ count }} projects tracked</p>
    <table>
        <tr><th>ID</th><th>Name</th><th>Platform</th><th>Status</th></tr>
        {% for row in rows %}
        <tr>
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }}</td>
            <td class="platform">{{ row[2] }}</td>
            <td class="status-{{ row[3] }}">{{ row[3] }}</td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>
"""

@app.route("/")
def home():
    rows = get_projects()
    return render_template_string(HTML_TEMPLATE, rows=rows, count=len(rows))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
