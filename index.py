from flask import Flask, render_template, url_for, request, redirect, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "ancegri"
mysql = MySQL(app)

app.secret_key = "0024"


@app.route("/")
def home():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM slide")
    slides = cursor.fetchall()
    print(slides)
    cursor.execute("""SELECT id_blog, titulo, fecha, SUBSTRING(texto, 1, 255), imagen 
                      FROM blog 
                      ORDER BY id_blog DESC 
                      LIMIT 3""")
    entradasBlog = cursor.fetchall()
    cursor.execute("SELECT * FROM infocontacto")
    infoContacto = cursor.fetchall()
    return render_template("index.html", entradas = entradasBlog, slideList = slides, contactInfo = infoContacto)

@app.route("/servicios")
def services():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM infocontacto")
    infoContacto = cursor.fetchall()
    return render_template("servicios.html", contactInfo = infoContacto)

@app.route("/cotizacion")
def quotation():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM municipio")
    municipios = cursor.fetchall()
    cursor.execute("SELECT * FROM tipotarifa")
    tipotarifa = cursor.fetchall()
    cursor.execute("SELECT * FROM tarifa")
    tarifa = cursor.fetchall()
    instructions = "Introduzca el monto más bajo y el más alto que ha pagado en su recibo de luz para verificar la factibildad de la implementación de un sistema fotovoltaico en su localidad."
    flash(instructions)
    return render_template("cotizacion.html", municipios = municipios, tipotarifa = tipotarifa, tarifa = tarifa)

@app.route("/enviar_datos", methods=['POST'])
def sendQuotation():
    if request.method == 'POST':
        id_municipio = int(request.form["municipio"])
        id_tarifa = int(request.form["tarifa"])
        id_tipotarifa = int(request.form["tipotarifa"])
        nombre = request.form["name"]
        telefono = request.form["phone"]
        email = request.form["email"]
        pago_minimo = float(request.form["pagoMin"])
        pago_maximo = float(request.form["pagoMax"])
        recibocfe = request.form.get("recibo", False)
        mensaje = request.form.get("message", False)
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO cotizacion(id_municipio, id_tarifa, id_tipotarifa, nombre, telefono, email, pago_minimo, pago_maximo, recibocfe)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,(id_municipio, id_tarifa, id_tipotarifa, nombre, telefono, email, pago_minimo, pago_maximo, recibocfe))  
        mysql.connection.commit()
        flash("Se han enviado tus datos")
        return redirect(url_for('quotation'))

@app.route("/blog/<id>")
def blogEntrance(id):
    return render_template("entrance.html")

if __name__ == "__main__":
    app.run(debug=True)