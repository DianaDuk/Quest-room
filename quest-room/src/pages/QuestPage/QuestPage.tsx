import {
  Box,
  Text,
  Image,
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
  useDisclosure
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuest } from "../../api/QuestAPI";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Введите корректный номер телефона" }),
  participants: z.number().min(2, { message: "Минимум 2 участникa" }),
  agree: z.literal(true, { message: "Вы должны согласиться с условиями" })
});

type FormData = z.output<typeof formSchema>;

const QuestPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const questId = Number(id);
  const { data: quest, isLoading, error } = useQuest(questId);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Данные для отправки:", data);
    // Здесь добавь POST-запрос на бэкенд
    onClose();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading quest</Text>;
  if (!quest) return <Text>No quest found</Text>;

  return (
    <Box
      bgImage={quest?.image}
      className="bg-cover bg-center items-end relative"
      minH="100vh"
      w="100%"
    >
      <Box
        className="absolute"
        left="50%"
        top="50%"
        transform="translateY(-50%)"
        maxWidth="520px"
      >
        <Text className="text-[#F2890F]" fontSize="14px">
          {quest?.category}
        </Text>
        <Text fontWeight="900" fontSize="92px" textTransform="uppercase">
          {quest?.title}
        </Text>
        <Box className="flex" gap="10px">
          <Box className="flex" gap="7px" h="24px">
            <Image src="/clock.svg" /> <Text>{quest?.duration} мин</Text>
          </Box>
          <Box w="1px" h="30px" className="bg-[#FFFFFF]" />
          <Box className="flex" gap="7px" h="24px">
            <Image src="/person.svg" /> <Text>{quest?.players} чел</Text>
          </Box>
          <Box w="1px" h="30px" className="bg-[#FFFFFF]" />
          <Box className="flex" gap="7px" h="24px">
            <Image src="/puzzle.svg" /> <Text>{quest?.level}</Text>
          </Box>
        </Box>
        <Text fontWeight="500" fontSize="15px" my="30px">
          {quest?.description}
        </Text>
        <Button
          onClick={onOpen}
          bgColor="#F28A0F"
          textColor="#FFFFFF"
          borderRadius="65px"
          w="250px"
          h="65px"
          fontWeight="800"
          fontSize="17px"
          textTransform="uppercase"
        >
          Забронировать
        </Button>
      </Box>

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
        >
          <ModalHeader
            p="0"
            mb="30px"
            fontWeight="800"
            fontSize="28px"
            textColor="#FFFFFF"
          >
            Оставить заявку
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
                  Ваше Имя
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
                  <Text color="red.400" fontSize="sm">
                    {errors.name.message}
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
                  <Text color="red.400" fontSize="sm">
                    {errors.phone.message}
                  </Text>
                )}
              </FormControl>

              <FormControl mb="52px">
                <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                  Количество участников
                </FormLabel>
                <Input
                  {...register("participants", { valueAsNumber: true })}
                  placeholder="Количество участников"
                  type="number"
                  borderRadius="0"
                  border="1px solid #ddd"
                  p="15px"
                  textColor="#FFFFFF"
                />
                {errors.participants && (
                  <Text color="red.400" fontSize="sm">
                    {errors.participants.message}
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
                  Отправить заявку
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
                <Text color="red.400" fontSize="sm">
                  {errors.agree.message}
                </Text>
              )}
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QuestPage;
