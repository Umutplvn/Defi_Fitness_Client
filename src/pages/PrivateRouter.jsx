import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Index from './Index';
import HomeAppBar from '../components/HomeAppBar';
import HomeTabBar from '../components/HomeTabBar';
import HomeAppBarLarge from '../components/HomeAppBarLarge';
import { useMediaQuery, useTheme } from '@mui/material';

const PrivateRouter = () => {
    const { userId } = useSelector((state) => state.auth);
    
    const theme = useTheme();
    
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            {userId ? (
                <>
                    {isSmallScreen ? (
                        <>
                            <HomeAppBar />
                            <HomeTabBar />
                        </>
                    ) : (
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
