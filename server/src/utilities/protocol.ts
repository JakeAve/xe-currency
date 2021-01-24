import http from 'http';
import https from 'https';

interface Protocol {
  request: (
    url: string,
    options: { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; headers?: object; body?: object },
    callback?: (res: any) => void,
  ) => Request;
}

const protocol = (input: string): Protocol => {
  const { protocol } = new URL(input);
  const options = { 'https:': https, 'http:': http };
  return options[protocol] || https;
};

export default protocol;
