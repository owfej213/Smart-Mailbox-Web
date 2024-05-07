/* eslint-disable react/prop-types */
import { Menu, MenuItem, MenuTrigger, Popover} from 'react-aria-components';
import styled from '@emotion/styled';
import { space } from 'styled-system';
import { StyledButton } from './CommonStyles';
import { doSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Icon from './ui/Icon';

export function UserMenu() {
    const navigate = useNavigate();

    const handleMenuItemClick = (key) => {
        if(key === "logout"){
            doSignOut().then(() => navigate('/Login'));
        }
        if(key === "setting"){
            navigate('/home/setting');
        }
    }

    return (
        <MenuTrigger>
            <StyledButton 
                aria-label="Menu"
                bg="transparent"
                p="0.8em"
            >
                <Icon name="CircleUserRound" color="white" size={42}/>
            </StyledButton>
            <Popover placement='bottom right'>
                <StyledMenu onAction={handleMenuItemClick}>
                    <StyledMenuItem id="setting" px="12px" py="4px">個人設定</StyledMenuItem>
                    <StyledMenuItem id="logout" px="12px" py="4px">登出</StyledMenuItem>
                </StyledMenu>
            </Popover>
        </MenuTrigger>
    )
}

export function Notify() {

    return (
        <MenuTrigger>
            <StyledButton 
                aria-label="Menu"
                bg="transparent"
                p="0.8em"
            >
                <Icon name="Bell" color="white" size={42}/>
            </StyledButton>
            <Popover placement='bottom right'>
                <StyledMenu>
                    <StyledMenuItem id="setting" px="24px" pt="4px">目前沒有任何通知</StyledMenuItem>
                </StyledMenu>
            </Popover>
        </MenuTrigger>
    )
}

const StyledMenu = styled(Menu)`
    background-color: rgb(122, 122, 122);
    color: white;
    max-height: inherit;
    overflow: auto;
    padding: 2px;
    min-width: 150px;
    outline: none;
    border-radius: 8px;
    &[data-focused] {
        outline: none;
    }
`

const StyledMenuItem = styled(MenuItem)`
    ${space}
    margin: 2px;
    border-radius: 6px;
    outline: none;
    cursor: default;
    font-size: 1.072rem;
    position: relative;
    display: grid;
    grid-template-areas: "label kbd"
                        "desc  kbd";
    align-items: center;
    forced-color-adjust: none;

    &[data-focused] {
        background: rgb(160, 160, 160);
    }
`