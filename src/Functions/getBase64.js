function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); //sukuriamas failo skaitytuvas
      reader.readAsDataURL(file); // failo nuskaitymas
      reader.onload = () => resolve(reader.result); //failo uzkrovimas
      reader.onerror = (error) => reject(error); // nepavykus nuskaityti erroras
    });
  }
  export default getBase64;