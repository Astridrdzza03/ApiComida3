import { comidaModel } from "../models/comida.model.js";
import message from '../utils/messages.js';

const {messageGeneral} = message;

const comidaCtrl = {};

comidaCtrl.createComida = async(req, res) => {
    try {
        const data = req.body;
        const resp = await comidaModel.create(data);
        messageGeneral(res,201,true,resp,"¡Platillo creado!");
      } catch (error) {
        messageGeneral(res,500,false,"",error.message);
      }
}

comidaCtrl.listAllComida=async(req,res)=>{
  try {
    //hace el inner join con el usuario y que no muestre el password.
    const resp= await comidaModel.find();
    if (resp.length === 0) {
      return res.status(404).json({ message: 'No se encontraron platillos.' });
    }
    messageGeneral(res,200,true,resp,"Lista de platillos");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

comidaCtrl.searchComida = async(req,res) =>{
  try {
    const { key, value } = req.params;
    const searchKey = key.toLowerCase();
    let searchValueL="", resp="";
    let searchValueN=0;
    if (searchKey==='nombre' || searchKey==='categoria' || searchKey==='ingredientes' || searchKey==='descripcion') {
      searchValueL = new RegExp(value, 'i');
      resp = await comidaModel.find({ [searchKey]: searchValueL });
      if (resp.length === 0) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,resp,"Lista de platillos");
    }
    else if (searchKey==='precio' || searchKey==='codigo'){
      searchValueN = parseFloat(value);
      resp = await comidaModel.find({ [searchKey]: searchValueN });
      if (resp.length === 0) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,resp,"Lista de platillos");
    }
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

comidaCtrl.updateComida = async(req,res) =>{
   try {
    const { key, value } = req.params;
    const actualizaciones = req.body;
    const searchKey = key.toLowerCase();
    let searchValueL="", resp="";
    let searchValueN=0;
    if (searchKey==='nombre' || searchKey==='categoria' || searchKey==='ingredientes' || searchKey==='descripcion') {
      searchValueL = new RegExp(value, 'i');
      resp = await comidaModel.findOneAndUpdate({ [searchKey]: searchValueL }, actualizaciones, { new: true });
      if (!resp) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo actualizado");
    }
    else if (searchKey==='precio' || searchKey==='codigo'){
      searchValueN = parseFloat(value);
      resp = await comidaModel.findOneAndUpdate({ [searchKey]: searchValueN }, actualizaciones, { new: true });
      if (!resp) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo actualizado");
    }
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

comidaCtrl.updateComidaMany = async(req,res) =>{
  /*try {
    const { key, value } = req.params;
    const actualizaciones = req.body;
    const searchValue = new RegExp(value, 'i');
    const searchKey = key.toLowerCase();
    const resp = await comidaModel.updateMany({ [searchKey]: searchValue }, actualizaciones);
    if(resp.matchedCount === 0){
      return messageGeneral(res,404,false,"","Platillo no encontrado");
    }
    messageGeneral(res,200,true,"","Platillo actualizado!!!");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }*/
    try {
      const { key, value } = req.params;
      const actualizaciones = req.body;
      const searchKey = key.toLowerCase();
      let searchValueL="", resp="";
      let searchValueN=0;
      if (searchKey==='nombre' || searchKey==='categoria' || searchKey==='ingredientes' || searchKey==='descripcion') {
        searchValueL = new RegExp(value, 'i');
        resp = await comidaModel.updateMany({ [searchKey]: searchValueL }, actualizaciones);
        if (resp.matchedCount === 0) {
          return res.status(404).json({ message: 'No se encontraron platillos.' });
        }
        messageGeneral(res,200,true,"","Platillo actualizado");
      }
      else if (searchKey==='precio' || searchKey==='codigo'){
        searchValueN = parseFloat(value);
        resp = await comidaModel.updateMany({ [searchKey]: searchValueN }, actualizaciones);
        if (resp.matchedCount === 0) {
          return res.status(404).json({ message: 'No se encontraron platillos.' });
        }
        messageGeneral(res,200,true,"","Platillo actualizado");
      }
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
};

comidaCtrl.deleteComida = async(req,res) =>{
  /*try {
    const { key, value } = req.params;
    const keyM = key.toLowerCase();
    const query = {};
    query[keyM] = new RegExp(value, 'i'); // 'i' hace que la búsqueda no sea sensible a mayúsculas/minúsculas
    const resp = await comidaModel.findOneAndDelete(query);
    if(resp.deletedCount === 0){
      return messageGeneral(res,404,false,"","Platillo no encontrado");
    }
    messageGeneral(res,200,true,"","Platillo eliminado!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }*/
  try {
    const { key, value } = req.params;
    const searchKey = key.toLowerCase();
    let searchValueL="", resp="";
    let searchValueN=0;
    if (searchKey==='nombre' || searchKey==='categoria' || searchKey==='ingredientes' || searchKey==='descripcion') {
      searchValueL = new RegExp(value, 'i');
      resp = await comidaModel.findOneAndDelete({ [searchKey]: searchValueL });
      if (!resp) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo eliminado");
    }
    else if (searchKey==='precio' || searchKey==='codigo'){
      searchValueN = parseFloat(value);
      resp = await comidaModel.findOneAndDelete({ [searchKey]: searchValueN });
      if (!resp) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo eliminado");
    }
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

comidaCtrl.deleteComidaMany = async(req,res) =>{
  /*try {
    const { key, value } = req.params;
    const searchValue = new RegExp(value, 'i');// 'i' hace que la búsqueda no sea sensible a mayúsculas/minúsculas
    const searchKey = key.toLowerCase();
    const resp = await comidaModel.deleteMany({ [searchKey]: searchValue });
    if(resp.deletedCount === 0){
      return messageGeneral(res,404,false,"","Platillo no encontrado");
    }
    messageGeneral(res,200,true,"","Platillo eliminado!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }*/
  try {
    const { key, value } = req.params;
    const searchKey = key.toLowerCase();
    let searchValueL="", resp="";
    let searchValueN=0;
    if (searchKey==='nombre' || searchKey==='categoria' || searchKey==='ingredientes' || searchKey==='descripcion') {
      searchValueL = new RegExp(value, 'i');
      resp = await comidaModel.deleteMany({ [searchKey]: searchValueL });
      if (resp.deletedCount === 0) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo eliminado");
    }
    else if (searchKey==='precio' || searchKey==='codigo'){
      searchValueN = parseFloat(value);
      resp = await comidaModel.deleteMany({ [searchKey]: searchValueN });
      if (resp.deletedCount === 0) {
        return res.status(404).json({ message: 'No se encontraron platillos.' });
      }
      messageGeneral(res,200,true,"","Platillo eliminado");
    }
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

export default comidaCtrl;