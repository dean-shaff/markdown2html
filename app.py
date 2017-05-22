from flask import Flask, render_template, jsonify, request
import json
import requests
import time

app = Flask(__name__)

@app.route("/")
def main():
	return render_template("index.html")

if __name__ == '__main__':
	app.run(debug=True)
