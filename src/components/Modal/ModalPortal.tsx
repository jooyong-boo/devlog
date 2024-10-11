import ReactDom from 'react-dom';

interface Props {
  children: React.ReactNode;
  modalKey: string;
}

const ModalPortal = ({ children, modalKey }: Props) => {
  let el = document.getElementById(modalKey) as HTMLElement;
  if (!el) {
    const newPortal = document.createElement('div');
    newPortal.setAttribute('id', modalKey);
    document.body.appendChild(newPortal);
    el = newPortal;
  }
  return ReactDom.createPortal(children, el);
};

export default ModalPortal;
