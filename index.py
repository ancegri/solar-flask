from flask import Flask, render_template, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "ancegri"
mysql = MySQL(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/servicios")
def services():
    return render_template("servicios.html")

@app.route("/cotizacion")
def quotation():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM municipio")
    municipios = cursor.fetchall()
    cursor.execute("SELECT * FROM tipotarifa")
    tipotarifa = cursor.fetchall()
    cursor.execute("SELECT * FROM tarifa")
    tarifa = cursor.fetchall()
    return render_template("cotizacion.html", municipios = municipios, tipotarifa = tipotarifa, tarifa = tarifa)

if __name__ == "__main__":
    app.run(debug=True)