import os
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite que o GitHub Pages converse com o Render

# Descobre o caminho correto do banco de dados em qualquer servidor
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "guerreiros_play.db")

def conectar_banco():
    conexao = sqlite3.connect(DB_PATH)
    return conexao

def inicializar_banco():
    conexao = conectar_banco()
    cursor = conexao.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    ''')
    conexao.commit()
    conexao.close()

# Garanta que a sua rota de cadastro esteja exatamente assim:
@app.route('/api/cadastro', methods=['POST'])
def rota_cadastro():
    # Sua lógica de cadastro aqui...
    pass

# Garanta que a sua rota de login esteja exatamente assim:
@app.route('/api/login', methods=['POST'])
def rota_login():
    # Sua lógica de login aqui...
    pass

if __name__ == '__main__':
    inicializar_banco()
    # O Codespaces roda na porta 5000 interna
    app.run(host='0.0.0.0', port=5000, debug=True)
else:
    # Quando roda via Gunicorn no Render, cria o banco antes de subir as rotas
    inicializar_banco()