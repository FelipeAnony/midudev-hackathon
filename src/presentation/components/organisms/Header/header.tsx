import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppLogo } from '@/presentation/components/atoms';

import BurguerMenuIcon from '@/presentation/assets/icons/hamburguer.svg';

import { TranslationsKeys, useTranslate } from '@/presentation/content/hooks';
import { linksToRender } from './header-utils';

import './header-styles.scss';

const Header: React.FC = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const location = useLocation();
    const translate = useTranslate();

    const defineLinkIsActive = (path: string) => {
        return location.pathname === path ? '--active' : '';
    };

    const links = linksToRender.map(({ path, label }) => (
        <Link
            onClick={() => setMobileMenuIsOpen(false)}
            className={`app-header__link${defineLinkIsActive(path)}`}
            to={path}
            key={path}
        >
            {translate(label as TranslationsKeys)}
        </Link>
    ));

    return (
        <header className="app-header">
            <nav className="app-header__navigation-bar">
                <div className="app-header__burguer-menu-icon">
                    <BurguerMenuIcon
                        onClick={() => setMobileMenuIsOpen(true)}
                    />
                </div>

                <Link className="app-header__logo-link" to={'/'}>
                    <AppLogo />
                </Link>

                <div
                    className={`app-header__mobile-links-container ${
                        mobileMenuIsOpen
                            ? 'app-header__mobile-links-container--open'
                            : ''
                    }`}
                    onClick={() => setMobileMenuIsOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`app-header__mobile-links-inner-container ${
                            mobileMenuIsOpen
                                ? 'app-header__mobile-links-inner-container--open'
                                : ''
                        }`}
                    >
                        <Link
                            onClick={() => setMobileMenuIsOpen(false)}
                            className={`app-header__link${defineLinkIsActive(
                                '/'
                            )}`}
                            to={'/'}
                        >
                            {translate('app.general.home')}
                        </Link>
                        {links}
                    </div>
                </div>

                <div className="app-header__links-container">{links}</div>
            </nav>
        </header>
    );
};

export default Header;
