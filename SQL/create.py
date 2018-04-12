import sqlite3
from datetime import date
from random import randint, choice

conn = sqlite3.connect('sda.db')

c = conn.cursor()

try:
    c.execute("CREATE TABLE estudiantes (nombre text, apellido text, sexo text, edad real, nacimiento text)")
except:
    pass

def crearEstudiante():

    hombres = ['Juan', 'Carlos', 'Andres', 'Felipe', 'Carlos', 'Alberto',
            'Alexander', 'Diego', 'Fernando', 'Carlos', 'Andres', 'Juan',
            'David', 'Sebastian', 'Juan', 'Camilo', 'Luis', 'Fernando']
    mujeres = ['Sandra', 'Milena', 'Carolina', 'Daniela', 'Paola', 'Andrea',
              'Paula', 'Andrea', 'Luz', 'Marina', 'Claudia', 'Patricia',
              'Luisa', 'Fernanda', 'Valentina', 'Sandra']
    apellidos = ['Rodriguez', 'Gomez', 'Lopez', 'Gonzalez', 'Garcia', 'Martinez',
                'Ramirez', 'Sanchez', 'Hernandez', 'Diaz', 'Perez', 'Torres',
                'Rojas', 'Vargas', 'Moreno', 'Gutierrez', 'Jimenez', 'Munoz',
                'Castro', 'Ortiz', 'Alvarez', 'Ruiz', 'Suarez','Romero', 'Herrera',
                 'Valencia', 'Quintero', 'Restrepo']
    generos = ['Masculino', 'Femenino']

    res = dict()
    res['sexo'] = choice(generos)
    if(res['sexo'] == 'Masculino'):
        res['nombre'] = choice(hombres)
    if(res['sexo'] == 'Femenino'):
        res['nombre'] = choice(mujeres)
    res['apellido'] = choice(apellidos)

    # Ano de nacimiento
    nacimiento = randint(1980,2000)
    res['edad'] = (2018 - nacimiento)
    res['nacimiento'] = date(nacimiento,randint(1,12),randint(1,28)).strftime('%Y-%m-%d')

    return res

for i in xrange(100):
    est = crearEstudiante()
    c.execute("INSERT INTO estudiantes VALUES (?,?,?,?,?)", (est['nombre'], est['apellido'], est['sexo'], est['edad'], est['nacimiento']))

conn.commit();
conn.close();
