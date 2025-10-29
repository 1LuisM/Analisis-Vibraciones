from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

def leer_csv(ruta, sensor):
    df = pd.read_csv(ruta, skiprows=1)  # Ignora la primera línea "# IKS4A1"
    columnas = {
        "acelerometro": ["acc_x[mg]", "acc_y[mg]", "acc_z[mg]"],
        "giroscopio": ["gyro_x[mdps]", "gyro_y[mdps]", "gyro_z[mdps]"]
    }
    return {
        "x": df[columnas[sensor][0]].tolist(),
        "y": df[columnas[sensor][1]].tolist(),
        "z": df[columnas[sensor][2]].tolist()

    }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/datos/<estado>")
def datos(estado):
    archivo = f"static/data/{estado}.csv"
    try:
        acelerometro = leer_csv(archivo, "acelerometro")
        giroscopio = leer_csv(archivo, "giroscopio")
        return jsonify({
            "acelerometro": acelerometro,
            "giroscopio": giroscopio
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)