import React from 'react'
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from '../../api/AuthAPI';

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  surname: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Введите корректный номер телефона" }),
  password: z.string().min(6, { message: "Пароль должен содержать минимум 6 символов" }),
  agree: z.literal(true, { message: "Вы должны согласиться с условиями" })
});

type FormData = z.output<typeof formSchema>;

const RegisterModal = ({isOpen, onClose}: ModalProps) => {
  const registerMutation = useRegister();
 
   const {
     register,
     handleSubmit,
     formState: { errors },
     setError,
   } = useForm<FormData>({
     resolver: zodResolver(formSchema)
   });
 
   const onSubmit: SubmitHandler<FormData> = (data) => {
     registerMutation.mutate(data, {
      onSuccess: (response) => {
        alert("Вы успешно зарегестрированы!");
        onClose(); 
      },
      onError: (error: any) => {
        const message = error?.message || "Произошла ошибка регистрации. Попробуйте ещё раз.";
        if (message.toLowerCase().includes('email')) {
        setError('email', { type: 'server', message });
      } else {
        alert(message);
      }
      console.log(error);
    }
  });
};
 
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
              bg="#1F1D1D"
              w="480px"
              h="656px"
              borderRadius="none"
              maxW="500px"
              p="40px"
              fontFamily="sans-serif"
              overflowY='auto'
            >
              <ModalHeader
                p="0"
                mb="30px"
                fontWeight="800"
                fontSize="28px"
                textColor="#FFFFFF"
              >
                Регистрация
              </ModalHeader>
              <ModalCloseButton
                top="40px"
                right="20px"
                color="#888"
                _hover={{ color: "#000" }}
              />
    
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody p="0">
                  <FormControl mb="32px">
                    <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                     Имя
                    </FormLabel>
                    <Input
                      {...register("name")}
                      placeholder="Имя"
                      borderRadius="0"
                      border="1px solid #ddd"
                      p="15px"
                      textColor="#FFFFFF"
                    />
                    {errors.name && (
                      <Text color="red.400" fontSize="sm" mt="5px">
                        {errors.name.message}
                      </Text>
                    )}
                  </FormControl>

                   <FormControl mb="32px">
                    <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                      Фамилия
                    </FormLabel>
                    <Input
                      {...register("surname")}
                      placeholder="Фамилия"
                      borderRadius="0"
                      border="1px solid #ddd"
                      p="15px"
                      textColor="#FFFFFF"
                    />
                    {errors.surname && (
                      <Text color="red.400" fontSize="sm" mt="5px">
                        {errors.surname.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl mb="32px">
                    <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                      Email
                    </FormLabel>
                    <Input
                      {...register("email")}
                      placeholder="Email"
                      borderRadius="0"
                      border="1px solid #ddd"
                      p="15px"
                      textColor="#FFFFFF"
                    />
                    {errors.email && (
                      <Text color="red.400" fontSize="sm" mt="5px">
                        {errors.email.message}
                      </Text>
                    )}
                  </FormControl>
    
                  <FormControl mb="32px">
                    <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                      Контактный телефон
                    </FormLabel>
                    <Input
                      {...register("phone")}
                      placeholder="Телефон"
                      type="tel"
                      borderRadius="0"
                      border="1px solid #ddd"
                      p="15px"
                      textColor="#FFFFFF"
                    />
                    {errors.phone && (
                      <Text color="red.400" fontSize="sm" mt="5px">
                        {errors.phone.message}
                      </Text>
                    )}
                  </FormControl>
    
                  <FormControl mb="32px">
                    <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                      Пароль
                    </FormLabel>
                    <Input
                      {...register("password")}
                      placeholder="Пароль"
                      borderRadius="0"
                      border="1px solid #ddd"
                      p="15px"
                      textColor="#FFFFFF"
                    />
                    {errors.password && (
                      <Text color="red.400" fontSize="sm" mt="5px">
                        {errors.password.message}
                      </Text>
                    )}
                  </FormControl>
    
                  <ModalFooter p="0" display="flex" justifyContent="center" mb="28px">
                    <Button
                      type="submit"
                      bgColor="#F28A0F"
                      color="white"
                      _hover={{ bg: "#e07d0d" }}
                      maxW="219px"
                      w="100%"
                      fontSize="12px"
                      fontWeight="600"
                      textTransform="uppercase"
                      borderRadius="65px"
                      border="none"
                    >
                      Зарегистрировать
                    </Button>
                  </ModalFooter>
    
                  <Checkbox
                    {...register("agree")}
                    colorScheme="orange"
                    alignItems="flex-start"
                    sx={{
                      ".chakra-checkbox__control": {
                        bg: "#F2890F",
                        border: "none",
                        borderRadius: "4px",
                        _checked: {
                          bg: "#C85C00",
                          border: "none"
                        },
                        _hover: {
                          bg: "#a64a00",
                          border: "none"
                        }
                      }
                    }}
                  >
                    <Text fontSize="12px" color="#E5E5E5" lineHeight="1.4">
                      Я согласен с{" "}
                      <Box as="span" textDecoration="underline">
                        правилами обработки персональных данных
                      </Box>{" "}
                      и пользовательским соглашением
                    </Text>
                  </Checkbox>
                  {errors.agree && (
                    <Text color="red.400" fontSize="sm" mt="5px">
                      {errors.agree.message}
                    </Text>
                  )}
                </ModalBody>
              </form>
            </ModalContent>
          </Modal>
  )
}

export default RegisterModal
