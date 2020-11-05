
const baseUrl = 'http://lobao.djjoaoo.live/';

const getAllItens = () => {
  return fetch(`${baseUrl}items`);
}

const getUrlImage = (path) => {
  const imagePath = path.substring(8);
  return `${baseUrl}imagem/${imagePath}`
}

export {
  getAllItens,
  getUrlImage,
};
