import logo from '../images/Vector.png';
import line from '../images/Line.png';

export function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the US"/>
      <img className="header__line" src={line} alt="underline"/>
    </header>
  )
}