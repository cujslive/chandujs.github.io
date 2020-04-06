/** @jsx jsx */

import { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Global, css, jsx } from '@emotion/core'

import { ColorsAdvanced } from '../styles/main'

import * as variables from '../styles/variables.json'

import * as person from '../../data/person.json'
import * as social from '../../data/social.json'
import * as skills from '../../data/skills.json'
import * as experience from '../../data/experience.json'
import * as education from '../../data/education.json'

const InfoSection = ({ title, children }) => (
  <div
    css={css`
      padding: 3rem;
    `}>
    <div
      css={css`
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        font-size: 1.2rem;
        opacity: 0.6;
        margin-bottom: 2.5rem;
      `}>
      {title}
    </div>
    {children}
  </div>
)

const ListItem = ({ icon, title, skill, children }) =>
  skill ? (
    <div
      css={css`
        background-color: ${ColorsAdvanced.main};
        color: #fff;
        display: inline-block;
        padding: 0.2rem 0.5rem;
        margin: 0.1rem;
        font-size: 1rem;
        border-radius: 0.2rem;
      `}>
      {children}
    </div>
  ) : (
    <div
      css={css`
        margin-bottom: 1.5rem;
        &:last-child {
          margin-bottom: 0;
        }
      `}>
      {title ? (
        <div
          css={css`
            text-transform: uppercase;
            margin-bottom: 0.2rem;
            font-weight: bold;
            color: ${ColorsAdvanced.main};
          `}>
          {title}
        </div>
      ) : (
        ''
      )}
      {icon ? (
        <img
          css={css`
            display: inline-block;
            margin-right: 1rem;
            width: 1.7rem;
            position: relative;
            top: -0.1rem;
            margin-left: -0.1rem;
            filter: invert(1);
            opacity: 0.7;
          `}
          src={icon}
          alt="Social Icon"
        />
      ) : (
        ''
      )}
      {children}
    </div>
  )

export default class ResumePage extends Component {
  render = () => {
    return (
      <div>
        <Global
          styles={css`
            body,
            html {
              font-family: ${variables.default.font}, sans-serif;
              font-size: 16px;
              background-color: #dcdcdc;
            }
            p {
              line-height: 1.7;
              text-align: justify;
              &:first-child {
                margin-top: -0.1rem;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          `}
        />
        <Helmet
          base="/"
          defaultTitle={'Resume of ' + person.name.first}
          meta={[
            {
              name: 'robots',
              content: 'noindex',
            },
          ]}>
          <html lang="en" />
        </Helmet>
        <div className="container">
          <div
            css={css`
              background-color: #fff;
            `}>
            <header
              css={css`
                background-image: url(images/cover.png);
                background-attachment: fixed;
                background-size: cover;
                background-position: center;
                background-color: #37474f;
                padding: 5rem 3rem 3rem;
                color: #fff;
              `}>
              <div
                css={css`
                  text-transform: uppercase;
                  font-size: 3rem;
                `}>
                <strong>{person.name.first}</strong> {person.name.last}
              </div>
              <div
                css={css`
                  text-transform: uppercase;
                  letter-spacing: 0.1rem;
                  margin-left: 0.2rem;
                `}>
                {person.position}
              </div>
            </header>
            <div className="row no-gutters">
              <div
                className="col-md-4"
                css={css`
                  background-color: #ececec;
                `}>
                <InfoSection title="Contact">
                  <ListItem title="Location">{person.location}</ListItem>
                  <ListItem title="Phone">{person.phone}</ListItem>
                  <ListItem title="Email">{person.email}</ListItem>
                  <ListItem title="Website">{person.website}</ListItem>
                </InfoSection>
                <InfoSection title="Social">
                  {social.map(item => {
                    const usernameSplits = item.url.split('/')
                    const username = usernameSplits[usernameSplits.length - 1]
                    return (
                      <ListItem icon={`images/icons/${item.icon}.png`}>
                        {`${item.service} @${username}`}
                      </ListItem>
                    )
                  })}
                </InfoSection>
                <InfoSection title="Skills">
                  <div
                    css={css`
                      margin: -0.1rem;
                      display: inline-block;
                    `}>
                    {skills.map(item => (
                      <ListItem skill>{item}</ListItem>
                    ))}
                  </div>
                </InfoSection>
                <InfoSection title="Education">
                  {education.map(item => (
                    <ListItem title={item.degree}>
                      <div>{item.duration}</div>
                      <div>{item.institute}</div>
                    </ListItem>
                  ))}
                </InfoSection>
                <InfoSection title="Languages">
                  {person.languages.map(item => (
                    <ListItem title={item.name}>{item.proficiency}</ListItem>
                  ))}
                </InfoSection>
              </div>
              <div className="col-md-8">
                <InfoSection title="Professional Profile">
                  {person.proProfile.map(item => (
                    <p>{item}</p>
                  ))}
                </InfoSection>
                <InfoSection title="Employment History">
                  {experience.map(item => (
                    <div
                      css={css`
                        margin-bottom: 1.5rem;
                        &:last-child {
                          margin-bottom: 0;
                        }
                      `}>
                      <div
                        css={css`
                          margin-bottom: 0.3rem;
                        `}>
                        <span
                          css={css`
                            font-weight: bold;
                            font-size: 1.1rem;
                          `}>
                          {item.company ? `${item.company} | ` : ''}
                          {item.position}
                        </span>
                        <span className="float-right text-muted">
                          {item.duration}
                        </span>
                      </div>
                      <div
                        css={css`
                          margin-bottom: 1.5rem;
                        `}
                        className="text-muted">
                        {item.location}
                      </div>
                      <div>
                        {item.description.map(desc => (
                          <p>{desc}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </InfoSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
