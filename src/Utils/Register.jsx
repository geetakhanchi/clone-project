import React, { useState } from "react";

import "../Style/Register.css";
import { Input, Button, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [emailIn, setemailIn] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");
  
  
  const emailInput = () => {
    setemailIn("");
   
  };

  const userData = () => {
    let data = { name, email, password, cpassword, phone };

    if (
      name === "" &&
      email === "" &&
      password === "" &&
      cpassword === "" &&
      password === ""
    ) {
      alert("Enter details");
    } else if (password !== cpassword) {
      alert("Password Not Match");
    } else {
      fetch("https://safe-badlands-27546.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json();
        })
        .catch((Error) => {
          console.log("Error");
        });

      setTimeout(() => {
        alert("Registraion Successfull");
      }, 3000);

      console.log(data);
      setName("");
      setEmail("");
      setPass("");
      setCpassword("");
      setPhone("");
    }
  };

  return (
    <>
      <img
        className="BackImage"
        src="https://portal.peopleonehealth.com/Content/Images/CityImages/SparkAmericaCityPageHeader.jpg"
        alt=""
      />

      <div className="RegisterBox">
        <div>
          <img
            src="https://portal.peopleonehealth.com/Content/Images/CityImages/SparkAmerica2020-02-768x96.png"
            alt=""
          />
        </div>
        <div className="Container">
          <h3>Please enter your email address to get started:</h3>
          <br />
          <Input
            value={emailIn}
            onChange={(e) => setemailIn(e.target.value)}
            placeholder="Email Address"
            required={true}
            type={"email"}
          />
          <br />
          <br />
          <h3>
            Note: If your organization or company already uses PeopleOne, please
            enter your company email address above.
          </h3>
          <br />
          <div className="RegBtn">
            <div>
              <Link to={"/cities"}>
                {" "}
                <h1
                  style={{
                    color: "#007FC4",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                >
                  GO BACK
                </h1>
              </Link>
            </div>
            <div>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onOpen();
                  emailInput();
                  
                }}
                disabled={emailIn===""}
              >
                CONTINUE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------Modal ------------------------------ */}
      {/* <Button >Open Modal</Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Full Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirm Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder="Enter Email"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPass(e.target.value)}
                type={"password"}
                placeholder="Enter Password"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Confrim Password</FormLabel>
              <Input
                type={"password"}
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Phone</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type={"number"}
                placeholder="Enter Phone"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={userData}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;
