export async function login(username, password){
  console.log("je suis icii")

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