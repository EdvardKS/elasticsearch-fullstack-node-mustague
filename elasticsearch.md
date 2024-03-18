GET _search
{
  "query": {
    "match_all": {}
  }
}





GET biblioteca/_search


# Ejercicio 4
# Busqueda por titulo
GET biblioteca/_search
{
  "query": {
    "match": {
      "book_title": "Explore America"
    }
  }
}


GET biblioteca/_search
{
  "query": {
    "match_phrase": {
      "book_title": "Women Who Made a Difference"
    }
  }
}

# Busqueda por autor  
GET biblioteca/_search
{
  "query": {
    "match_phrase": {
      "author": "Catherine M. Edmonson"
    }
  }
}

# Busqueda que contenga tanto del autor
GET biblioteca/_search
{
  "query": {
    "wildcard": {
      "author": "*Edvard*"
    }
  }
}


# Por rango de año de publicación 
GET biblioteca/_search
{
  "query": {
    "range": {
      "year_publish": {
        "gte": "2000",
        "lte": "2024"
      }
    }
  }
}
# No funciona niguna de las dos
GET biblioteca/_search
{
  "query": {
    "range": {
      "year_publish": {
        "gte": 2005,
        "lte": 2024
      }
    }
  }
}

# Por editorial "publisher"
GET biblioteca/_search
{
  "query": {
    "match": {
      "publisher": "Creative Pub Intl"
    }
  }
}

GET biblioteca/_search
{
  "query": {
    "match_phrase": {
      "publisher": "Pub Group West"
    }
  }
}

# Busqueda de una query en todos los campos anteriores
GET biblioteca/_search
{
  "query": {
    "multi_match": {
      "query": "Curiosities",
      "fields": ["book_title", "author", "year_publish", "publisher"]
    }
  }
}

GET biblioteca/_search
{
  "query": {
    "multi_match": {
      "query": "1997",
      "fields": ["book_title", "author", "year_publish", "publisher"]
    }
  }
}

GET biblioteca/?q=df&fields=book_title,author,year_publish,publisher



















# MUSTAGUE

## PARA MANTENER LA INDEPENDENCIA ENTRE MI SISTEMA BIG DATA Y MIS DESARROLLADORES WEB VOY A CREAR PLANTILLAS DE CONSULTAS Y A MIS DESARROLLADORES LES VOY A DECIR CUAL ES LA URL Y LOS PARÁMETROS A UTILIZAR PARA REALIZAR LAS CONSULTAS.
## Ahora me creo una plantilla de búsqueda con sintaxis mustache. LA QUERY ES LA MISMA QUE LA ANTERIOR EN DSL ##

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "content": "{{terminos}}"
        }
      }
    }
  }
}

GET _scripts/section_libros




## Ahora vamos a ejecutar la consulta guardada en la plantilla ##
## ESTO ES LO QUE LE DARÍAMOS A NUESTROS DESARROLLADORES WEB, LA URL DE LA PLANTILLA Y LOS PARÁMETROS QUE HAN DE PASAR PARA SER BUSCADOS EN elasticsearch ##

PUT _scripts/b_iban
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "wildcard": {
          "iban": "*{{iban}}*"
        }
      }
    }
  }
}
GET lib/_search/

GET goodbot/_search/template
{
  "id": "b_iban",
  "params": {
    "iban": "553373056"
  }
}


PUT _scripts/section_libros
{
    "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "wildcard": {
          "book_title": "*{{title}}*"
        }
        
      }
      
    }
  }
}


PUT _scripts/section_libros
{
    "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "iban": "{{iban}}"
        }
        
      }
      
    }
  }
}

# 385473974
POST lib/_search/template
{
  "id":"section_libros",
  "params": {"iban":385473974}
}




PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "range": {
          "year_publish": {
            "gte": "{{start_year}}",
            "lte": "{{end_year}}"
          }
        }
      }
    }
  }
}

PUT _scripts/section_libros_year
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "range": {
          "year_publish": {
            "gte": "{{start_year}}",
            "lte": "{{end_year}}"
          }
        }
      }
    }
  }
}

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "publisher": "{{publisher}}"
        }
      }
    }
  }
}

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "wildcard": {
          "author": "*{{author}}*"
        }
      }
    }
  }
}

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match_phrase": {
          "author": "{{specific_author}}"
        }
      }
    }
  }
}

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match_phrase": {
          "book_title": "{{specific_title}}"
        }
      }
    }
  }
}

PUT _scripts/section_libros
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "multi_match": {
          "query": "{{query}}",
          "fields": ["book_title", "author", "year_publish", "publisher"]
        }
      }
    }
  }
}


########################################################################################################################




















DELETE productos-edu/

PUT productos-edu/_doc/1
{
  "sku": 101,
  "nombre": "teléfono celular",
  "descripción": "Buen teléfono para cualquier situación.",
  "precio": 1000.95
}

GET productos-edu/_search


POST productos-edu/_update/1
{
  "doc": {"precio":250.95}
}


PUT productos-edu/_doc/6
{
  "sku": 102,
  "nombre": "pelota de playa",
  "descripción": "Una palota de playa para todo lo que quiera guardar por eternidad. Guarde una pelota de playa o un traje, sus tenis de uso diario, guarde otra raqueta, no hay límite a los usos de este armario.",
  "precio": 800.95
}

PUT productos-edu/_doc/3
{
  "sku": 403,
  "nombre": "raqueta de tenis",
  "descripción": "Raqueta de tenis aprobada por los mejores torneos. Fácil de guardar en cualquier armario. El gran tenista Raúl Ramírez en una ocasión usó una de estas raquetas de tenis (o una muy parecida) cuando jugó con uno de sus sobrinos.",
  "precio": 450.95
}

PUT productos-edu/_doc/4
{
  "sku": 111,
  "nombre": "tenis de uso diario",
  "descripción": "Camine con confianza en pavimento, lodo, alfombras, madera, y mas con estos tenis de alta tecnología y de alta calidad."
}

PUT productos-edu/_doc/5
{
  "sku": 334,
  "nombre": "pintura de color de rosa",
  "descripción": "A diario es posible el uso de esta pintura. Su uso es muy conveniente aun cuando su uso sea diario."
}

POST productos-edu/_update/1
{
  "doc": {
    "precio": 250.95
  }
}

GET productos-edu/_search
{
  "query": {
    "match": {
      "descripción": {
        "query": "tenis de uso diario",
        "operator": "or",
        "minimum_should_match": 2
      }
    }
  }
}

GET productos-edu/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "descripción": "tenis de uso diario"
          }
        }
      ],
      "should": [
        {
          "match": {
            "nombre": "tenis de uso diario"
          }
        }
      ]
    }
  }
}

=> Consulta Bool: Se utiliza una consulta "bool" que permite combinar múltiples consultas booleanas juntas. En este caso, se utilizan las cláusulas "must" y "should".
=> Cláusula "must": La cláusula "must" especifica que los documentos recuperados deben coincidir con todos los criterios especificados. En este caso, se utiliza una consulta "match" en el campo "descripción" para buscar documentos que contengan la frase "tenis de uso diario".

=> Cláusula "should": La cláusula "should" especifica que los documentos que coincidan con los criterios especificados se considerarán más relevantes, pero no son obligatorios. En este caso, se utiliza una consulta "match" en el campo "nombre" para buscar documentos que contengan la frase "tenis de uso diario". Posicionará con mayor prioridad los resultados que contengan esa frase en el campo "nombre".


GET productos-edu/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "descripción": "tenis de uso diario"
          }
        }
      ],
      "should": [
        {
          "match": {
            "nombre": "tenis de uso diario"
          }
        },
        {
          "match_phrase": {
            "nombre": "tenis de uso diario"
          }
        }
      ]
    }
  }
}

