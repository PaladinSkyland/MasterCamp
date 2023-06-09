export async function login(email, password){

  // Specification des options de la méthode fetch
  const options = {
    method: "POST", //Post pour ne pas mettre le mdp dans l'url
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }
    //On attend la réponse du serveur avec login
    const response = await fetch('./login', options)
    const data = await response.json()
    
    return data
}

export function setHttpOnlyCookie(name, value, expiration) {
  //Créer un cookie avec un nom, une valeur et une date d'expiration
  var cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; HttpOnly`;
  //Ajoute une date d'expiration au cookie
  if (expiration) {
    cookie += `; Expires=${expiration.toUTCString()}`;
  }
  //Défini le cookie dans le navigateur
  document.cookie = cookie;
}