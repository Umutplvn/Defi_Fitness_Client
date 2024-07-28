import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import Index from './Index';
import HomeAppBar from '../components/HomeAppBar';
import HomeTabBar from '../components/HomeTabBar';
import HomeAppBarLarge from '../components/HomeAppBarLarge';
import { useMediaQuery, useTheme } from '@mui/material';

const PrivateRouter = () => {
    const { userId } = useSelector((state) => state.auth);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const { id } = useParams();

    const isChatPage = location.pathname.startsWith('/chat/');

    return (
        <div>
            {userId ? (
                <>
                    {!isChatPage && isSmallScreen && (
                        <>
                            <HomeAppBar />
                            <HomeTabBar />
                        </>
                    )}
                    {!isChatPage && !isSmallScreen && (
                        <HomeAppBarLarge />
                    )}
                    <Outlet />
                </>
            ) : (
                <Index />
            )}
        </div>
    );
};

export default PrivateRouter;
