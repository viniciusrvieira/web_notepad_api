import { Request, Response } from 'express';

const service = require('../services/service');

interface errorJson {
  error: {
    code: number;
    message: string;
  };
}
interface pathContent extends Partial<errorJson> {
  data?: {
    kind: string;
    charset?: string;
    content?: string;
    items: [{ kind: string; name: string }];
  };
}
interface messageObject extends Partial<errorJson> {
  data?: { message: string };
}

function readPath(req: Request, res: Response) {
  const { query } = req;
  const pathContent: pathContent = service.readPath(`${query.url}`);
  if (pathContent.error) {
    return res
      .set('Content-Type', 'application/json')
      .status(pathContent.error.code)
      .send(pathContent);
  }
  res.set('Content-Type', 'application/json').status(200).send(pathContent);
}
function updatePath(req: Request, res: Response) {
  const { query } = req;
  const updatePath: messageObject = service.updatePath(query.url, query.text);
  if (updatePath.error) {
    return res
      .set('Content-Type', 'application/json')
      .status(updatePath.error.code)
      .send(updatePath);
  }
  res.set('Content-Type', 'application/json').status(200).send(updatePath);
}

function createFile(req: Request, res: Response) {
  const { query } = req;
  const createFile: messageObject = service.createFile(query.url, query.name);
  if (createFile.error) {
    return res
      .set('Content-Type', 'application/json')
      .status(createFile.error.code)
      .send(createFile);
  }
  res.status(200).send(createFile);
}
function createFolder(req: Request, res: Response) {
  const { query } = req;
  const createFolder: messageObject = service.createFolder(
    query.url,
    query.name
  );
  if (createFolder.error) {
    return res
      .set('Content-Type', 'application/json')
      .status(createFolder.error.code)
      .send(createFolder);
  }
  res.send(createFolder);
}

module.exports = { readPath, updatePath, createFile, createFolder };
