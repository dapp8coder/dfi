/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { renderIcon } from '@download/blockies'
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Icon from "@material-ui/core/Icon";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import TranslateIcon from '@material-ui/icons/Translate';
import TelegramIcon from '@material-ui/icons/Telegram';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// hooks
import { useTranslation } from 'react-i18next';

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { dropdownHoverColor, address } = props;
  // const { connectWallet, disconnectWallet } = action;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lng, setLanguage] = useState('en');
  const [shortAddress, setShortAddress] = useState('');
  const [dataUrl, setDataUrl] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if(!address) return;
    const canvas = canvasRef.current
    renderIcon({ seed: address.toLowerCase() }, canvas)
    const updatedDataUrl = canvas.toDataURL()
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl)
    }
    if (address.length < 11) {
      setShortAddress(address)
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`)
    }  
  }, [dataUrl, address])

  const switchLanguage = () => {
    switch(i18n.language) {
      case 'zh':
      case 'zh-CN':
        return '中文'
      case 'en':
        return 'English'
      case 'ja':
        return '日本語'
      case 'th':
        return 'ไทย'
      case 'ko':
        return '한글'
      default:
        return '中文'
    }
  }

  const handleClick = event => {
    console.log(event)
    switch(event) {
      case 'English':
        return i18n.changeLanguage('en').then(()=>setLanguage(event))
      case '中文':
        return i18n.changeLanguage('zh').then(()=>setLanguage(event))
      case '日本語':
        return i18n.changeLanguage('ja').then(()=>setLanguage(event))
      case 'ไทย':
        return i18n.changeLanguage('th').then(()=>setLanguage(event))
      case '한글':
        return i18n.changeLanguage('ko').then(()=>setLanguage(event))
      default:
        return
    }
  }

  useEffect(() => {
    const lng = switchLanguage()
    setLanguage(lng);
  });
  
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonIcon={TranslateIcon}
          buttonText={lng}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          onClick={handleClick}
          dropdownList={[
            "English",
            "中文",
            "日本語",
            "한글",
            "ไทย",
            { divider: true },
            <a
              href="https://github.com/yfii/vault/tree/master/src/locales"
              target="_blank"
            >
              Help to translate
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          style={{
              width: '180px',
              margin: '12px 0',
              fontSize: '14px',
              fontWeight:'bold',
              backgroundColor:'#635AFF',
              color:'#fff',
              boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
          }}
          className={classes.Button}
          round
          type="button"
          color="primary"
          onClick={
              event => {
                  event.stopPropagation();
              }
          }
        >
          {address ? (
            <>
              <canvas ref={canvasRef} style={{ display: 'none'}}/>
              <Avatar alt="address" src={dataUrl} style={{
                width:'24px',
                height:"24px",
                marginRight:'4px',
              }}/>{shortAddress}
            </>
          ):(
            <>
              <i className={"yfiiicon yfii-help-circle"} style={{
                width:'24px',
                marginRight:'4px',
              }}/>{t('Vault-Wallet')}
            </>
          )}
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
