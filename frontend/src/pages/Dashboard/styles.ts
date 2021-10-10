import styled from 'styled-components';
import { shade } from 'polished';

import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      width: 20px;
      height: 20px;
      color: #999591;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  display: flex;
  max-width: 1120px;
  margin: 64px auto;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
      text-transform: capitalize;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      margin: 0 8px;
      border-left: 1px solid #ff9000;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    font-weight: 400;
    color: #999591;
  }

  div {
    position: relative;

    display: flex;
    align-items: center;
    margin-top: 24px;
    padding: 16px 24px;
    border-radius: 10px;
    background: #3e3b47;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 80%;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        margin-right: 8px;
        color: #ff9000;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    width: 70px;
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #f4ede8;

    svg {
      margin-right: 8px;
      color: #ff9000;
    }
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 24px;
    padding: 16px 24px;
    border-radius: 10px;
    background: #3e3b47;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      font-size: 20px;
      margin-left: 24px;
      color: #fff;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
  border-radius: 10px;

  &-wrapper {
    padding-bottom: 0;
    background: #28262e;
    border-radius: 10px;
    z-index: 0;
  }

  &-NavBar {
    position: relative;

    ::before {
      content: '';
      width: 100%;
      height: 50px;
      position: absolute;
      background: #3e3b47;
      border-radius: 10px 10px 0 0;
      z-index: -1;
    }
  }

  &-NavButton {
    color: #999591 !important;
    margin-top: 0;
    top: 0;

    &--prev {
      background: url(${ArrowLeftIcon}) no-repeat center;
      margin-right: 0;
      left: 12px;
      width: 50px;
      height: 50px;
    }

    &--next {
      background: url(${ArrowRightIcon}) no-repeat center;
      right: 12px;
      width: 50px;
      height: 50px;
    }
  }

  &-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 0;
    padding: 0 10px 10px;
  }

  &-Caption {
    line-height: 50px;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  &-Weekday {
    color: #666360;
    font-size: 16px;
  }

  &-Day {
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;
    border-radius: 10px;

    &--today {
      font-weight: normal;
      color: #fff;
    }

    &--available:not(.DayPicker-Day--outside) {
      background: #3e3b47;
      border-radius: 10px;
    }

    &--disabled {
      color: #666360;
      background: transparent !important;
    }

    &--selected:not(.DayPicker-Day--disabled) {
      background: #ff9000 !important;
      color: #232129 !important;
    }
  }

  &:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
}
`;
