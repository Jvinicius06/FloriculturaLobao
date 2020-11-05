
const baseUrl = 'https://lobao.djjoaoo.live/';

const baseData = new Array();

const getAllItens = () => {
  return fetch(`${baseUrl}items`);
}

const _getIten = (uuid) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}item/${uuid}`)
      .then((d) => d.json())
      .then((d) => {
        const iid = d._id;
        baseData[iid] = {
            data: d,
            updateAt: Date(),
        };
        resolve(baseData[iid].data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const getIten = async (uuid) => {
  console.log(`uuid - `, uuid);
  if (baseData[uuid]) {
    const dd = baseData[uuid].updateAt;
    await _getIten(uuid);
    return baseData[uuid].data;
  } else {
    await _getIten(uuid);
    return baseData[uuid].data;
  }
}

const getUrlImage = (path) => {
  const imagePath = path.substring(8);
  return `${baseUrl}imagem/${imagePath}`
}

export {
  getAllItens,
  getUrlImage,
  getIten,
};
