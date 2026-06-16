from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib

app = Flask(__name__)
CORS(app) 

DATABASE = 'guerreiros_play.db'

def inicializar_banco():
    conexao = sqlite3.connect(DATABASE)
    cursor = conexao.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_usuario TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    ''')
    conexao.commit()
    conexao.close()

def hash_senha(senha):
    
    return hashlib.sha256(senha.encode()).hexdigest()

# --- ROTA DE CADASTRO ---
@app.route('/api/cadastro', methods=['POST'])
def rota_cadastro():
    dados = request.get_json()
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')
    
    if not nome or not email or not senha:
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400
        
    senha_cripto = hash_senha(senha)
    
    conexao = sqlite3.connect(DATABASE)
    cursor = conexao.cursor()
    try:
        cursor.execute('''
            INSERT INTO usuarios (nome_usuario, email, senha) 
            VALUES (?, ?, ?)
        ''', (nome, email, senha_cripto))
        conexao.commit()
        return jsonify({"mensagem": "Cadastro realizado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"erro": "Nome de usuário ou Email já cadastrado!"}), 400
    finally:
        conexao.close()

# --- ROTA DE LOGIN ---
@app.route('/api/login', methods=['POST'])
def rota_login():
    dados = request.get_json()
    email = dados.get('email')
    senha = dados.get('senha')
    
    if not email or not senha:
        return jsonify({"erro": "Preencha todos os campos!"}), 400
        
    senha_cripto = hash_senha(senha)
    
    conexao = sqlite3.connect(DATABASE)
    cursor = conexao.cursor()
    cursor.execute('''
        SELECT nome_usuario FROM usuarios WHERE email = ? AND senha = ?
    ''', (email, senha_cripto))
    
    usuario = cursor.fetchone()
    conexao.close()
    
    if usuario:
        return jsonify({
            "mensagem": "Login aprovado!",
            "usuario": usuario[0]
        }), 200
    else:
        return jsonify({"erro": "Email ou senha incorretos!"}), 401

if __name__ == '__main__':
    inicializar_banco()
   
    app.run(host='0.0.0.0', port=5000, debug=True)