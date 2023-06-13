export async function login(username, password){

  // Specification des options de la méthode fetch
  const options = {
    method: "POST", //Post pour ne pas mettre le mdp dans l'url
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }
    const response = await fetch('/login', options)
    const data = await response.json()

    return data.token

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