import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components'; // Keep the styled import

const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  font-size: bold;
`;

const SubmitButton = styled.button`
  padding: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover,
  &:focus {
    background-color: #4caf50;
    color: white;
    outline: none;
  }
`;

const AgeForm = () => {
  const [birthdate, setBirthdate] = useState('');
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationProps = useSpring({
    opacity: isAnimating ? 1 : 0,
    transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
  });

  const validateForm = () => {
    const errors = {};
    if (!birthdate) {
      errors.birthdate = 'Please enter your birthdate';
    }
    // Add other validation rules

    setErrors(errors);
    return errors;
  };

  const calculateAge = () => {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();

    const timeDifference = currentDate - birthDateObj;
    const ageDate = new Date(timeDifference);

    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setAge({ years, months, days });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsAnimating(true);

      setTimeout(() => {
        calculateAge();
        setIsAnimating(false);
      }, 1000); // Adjust the duration as needed
    } else {
      setAge(null);
      setIsAnimating(false);
      setErrors(validationErrors);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* Input for birthdate */}
      <h1>Age Calculator</h1>
      <label>
        Birthdate:
        <InputField
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>

      {/* Display errors */}
      {errors && (
        <div style={{ color: 'red' }}>
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Submit button */}
      <SubmitButton type="submit">Calculate Age</SubmitButton>

      {/* Display age result with animation */}
      {age && (
        <animated.div style={animationProps}>
          <p>
            Age: {age.years} years, {age.months} months, {age.days} days
          </p>
        </animated.div>
      )}
    </FormContainer>
  );
};

export default AgeForm;




