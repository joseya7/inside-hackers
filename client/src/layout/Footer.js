import React from 'react'
import './Footer.css'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__email-box">
        <h2 className="footer__title">최신정보를 항상 접하세요</h2>
        <h4 className="footer__text">
          이메일을 등록하시고 최고의 해커들의 노하우를 전수받으세요!
        </h4>
        <div className="footer__search">
          <input
            type="text"
            className="footer__input"
            placeholder="이메일을 입력해주세요"
          />
          <button className="footer__input-button">
            <TrendingFlatIcon className="footer__dash" />
          </button>
        </div>
      </div>
      <div className="footer__myinfo-box">
        <div className="footer__logo">
          <a href="#!" className="footer__home-link">
            <img
              src={require('../images/hacker.png')}
              alt=""
              className="footer__icon"
            />
            <h3 className="footer__icon-text">Inside Hackers</h3>
          </a>{' '}
          <span>by Jason Park</span>
        </div>
        <p className="footer__story">
          저의 첫 Fullstack Project입니다. 언제나 피드백은 환영입니다.
          <br />
          블로그에 글을 남겨주세요. <br />
          블로그에서 좋은정보를 얻으세요.{' '}
        </p>
        <div className="footer__social">
          <div className="footer__social-faq">FAQ · Terms · Privacy</div>
          <a href="https://blog.naver.com/joseya7">
            {' '}
            <img
              src={require('../images/naver.svg')}
              alt=""
              className="footer__icon-social"
            />
          </a>
          <a href="https://github.com/joseya7">
            {' '}
            <img
              src={require('../images/github.svg')}
              alt=""
              className="footer__icon-social"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
