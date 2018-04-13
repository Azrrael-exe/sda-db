import sqlite3
from datetime import date
from random import randint, choice

conn = sqlite3.connect('sda.db')

c = conn.cursor()

res = c.execute("SELECT nombre, apellido FROM estudiantes WHERE sexo='Femenino'");

for row in res:
    print row

conn.close();
