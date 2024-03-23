GET _search
{
  "query": {
    "match_all": {}
  }
}



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
      },
      "size": 1000
    }
  }
}

GET goodbot/_search/template
{
  "id": "b_iban",
  "params": {
    "iban": "553373056"
  }
}

### Busqueda por titulo
PUT _scripts/b_title
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "book_title": "{{title}}"
        }
      },
      "size": 1000
    }
  }
}

### Busqueda por rango de años
PUT _scripts/b_years
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
      },
      "size": 1000
    }
  }
}

### Busqueda por editorial
PUT _scripts/b_pub
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "publisher": "{{publisher}}"
        }
      },
      "size": 1000
    }
  }
}

### Busqueda por autor
PUT _scripts/b_author
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "match": {
          "author": "{{author}}"
        }
      },
      "size": 1000
    }
  }
}

### Busqueda completa
PUT _scripts/b_all
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "multi_match": {
          "query": "{{query}}",
          "fields": [
            "book_title",
            "author",
            "year_publish",
            "publisher"
          ]
        }
      }
    },
    "size": 1000
  }
}
