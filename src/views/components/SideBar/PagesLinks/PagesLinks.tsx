import SideBarLink from './SideBarItem/SideBarLink';

const PagesLinks = () => {
  return (
    <ul>
      <SideBarLink to='/profile' name='Profile' />
      <SideBarLink to='/users' name='Users' />
      <SideBarLink to='/music' name='Music' />
      <SideBarLink to='/settings' name='Settings' />
    </ul>
  );
};

export default PagesLinks;
