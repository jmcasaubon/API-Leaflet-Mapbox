    // Chargement de l'icone associée aux marqueurs, avec son ombre portée
    var iconeElan = L.icon({
        iconUrl: 'img/elan-80-image.png',
        shadowUrl: 'img/elan-80-ombre.png',
    
        iconSize:     [80, 80], // Taille de l'icone
        shadowSize:   [80, 80], // Taille de l'ombre portée
        iconAnchor:   [2, 72],  // Point de l'icone correspondant à la position du marqueur 
        shadowAnchor: [2, 72],  // Point de l'icone correspondant à la position du marqueur (pour l''ombre portée)
        popupAnchor:  [25, -25] // Point relatif de positionnement de la popup associée au marqueur
    })

    // Définition des URLs, token et attributs communs
    var myAPI = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
    var myToken = 'pk.eyJ1Ijoiam1jYXNhdWJvbiIsImEiOiJjazQzdnB6ZTEwYTV2M2twYWgxeG03MHIwIn0.ChR1NZqfzkin1JT1zwQhBg'
    var myAttrib = 'Donn&eacute;es cartographiques &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, contributions <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> &vert; Base cartographique &copy; <a href="https://www.mapbox.com/">Mapbox</a>'

    // Ajout de la couche cartographique par défaut fournie par Mapbox, et attribution des copyrights
    var streets = L.tileLayer(myAPI, {
        attribution: myAttrib,
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        accessToken: myToken
    })

    // Ajout de la couche cartographique fournie par Mapbox, avec style personnalisé, et attribution des copyrights
    var basover = L.tileLayer(myAPI, {
        attribution: myAttrib,
        maxZoom: 20,
        id: 'jmcasaubon/ck447zd5m0ty61coacysayccx',
        accessToken: myToken
    })

    // Ajout de la couche cartographique fournie par Mapbox, avec style personnalisé, et attribution des copyrights
    var outdoor = L.tileLayer(myAPI, {
        attribution: myAttrib,
        maxZoom: 20,
        id: 'jmcasaubon/ck49mdrd400br1dqn0ppvqato',
        accessToken: myToken
    })

    // Ajout de la couche cartographique satellite fournie par Mapbox, et attribution des copyrights
    var sat = L.tileLayer(myAPI, {
        attribution: myAttrib,
        maxZoom: 20,
        id: 'jmcasaubon/ck49nk9xy0lgr1cqg56qqsugl',
        accessToken: myToken
    })
   
    // Tableau (objet) des localisations des centres de formation
    var elanLongLat = { "Strasbourg" : [48.558, 7.748], 
                        "Saverne" : [48.744, 7.366], 
                        "Sélestat" : [48.260, 7.453], 
                        "Haguenau"  : [48.801, 7.771], 
                        "Colmar" : [48.0756, 7.342], 
                        "Mulhouse" : [47.744, 7.291], 
                        "Metz" : [49.107, 6.231], 
                        "Nancy" : [48.705, 6.142] }

    // Tableau (objet, avec le même index que précédenmment) des adresses des centres de formation
    var elanAdresse = { "Strasbourg" : "202 avenue de Colmar<br>67200 STRASBOURG", 
                        "Saverne" : "12 rue du Zornhof<br>67700 SAVERNE",
                        "Sélestat" : "46 rue des Chevaliers<br>67600 S&EacuteLESTAT",
                        "Haguenau" : "32 avenue du Professeur René Leriche<br>67500 HAGUENAU",
                        "Colmar" : "3 place du Capitaine Dreyfus<br>68000 COLMAR",
                        "Mulhouse" : "130 rue de la Mer Rouge<br>68200 MULHOUSE",
                        "Metz" : "Immeuble First Plaza<br>92 Quater A, bd Solidarité<br>57070 METZ",
                        "Nancy" : "138 rue André Bisiaux<br>54320 MAXEVILLE" }

    // Ajout des marqueurs dans une liste
    var elanCentres = [] 
    for (var ville in elanLongLat) {
        var coords = elanLongLat[ville]
        var marque = L.marker(coords, {icon: iconeElan}).bindPopup("<strong>Elan "+ville+"</strong><br><br>"+elanAdresse[ville])
        elanCentres.push(marque)
    }

    //Construction d'un groupes pour tous les centres de formation
    var centres = L.layerGroup(elanCentres)

    // Liste des couches de base (une seule sera affichée parmi celles-ci)
    var baseMaps = {
        "Vue par défaut": streets,
        "Niveaux de gris": basover,
        "Topographique": outdoor,
        "Satellite": sat
    }

    // Ajout des couches qui seront superposées à la couche de base 
    var overlayMaps = {
        "Centres de formation": centres
    }

    // Initialisation de la carte, centrée sur Strasbourg, en niveau de zoom 8, avec deux couches 
    var maCarte = L.map('cartographie', {
        center: [48.545, 7.749],
        zoom: 8,
        layers: [streets, centres]
    }) 

    // Ajout du contrôle des couches (la couche de base, et les couches superposées)
    L.control.layers(baseMaps, overlayMaps).addTo(maCarte)