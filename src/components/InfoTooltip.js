export function InfoTooltip(props) {
  return (
    <div
      id='tooltip'
      className={props.isPopupOpen ? 'popup popup_active' : 'popup'}
    >
      <div
        id='popup__overlay'
        onClick={props.onClose}
        className='popup__overlay'
      ></div>
      <div className='popup__group'>
        <img
          className='popup__image'
          src={props.image.link}
          alt={props.image.name}
        />
        <h3 className='popup__name'>{props.image.name}</h3>
        <button
          id='tooltip'
          onClick={props.onClose}
          className='popup popup__close'
        ></button>
      </div>
    </div>
  );
}
