import { Fragment, useMemo, useState } from "react";
import { useUpdateProfile, useUserMe } from "../../services/hooks";
import { TextField, Button } from "../../components";
import { FaPen } from "react-icons/fa";

export const ProfilePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [editAvatar, setEditAvatar] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data, refetch } = useUserMe();
  const { mutate, status } = useUpdateProfile();

  const user = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const [profile, setProfile] = useState({
    name: user?.name,
    email: user?.email,
    phone_number: user?.phone_number,
    address: user?.address,
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setEditAvatar(url);
    setAvatar(file);
  };

  const handleEdit = (e) => {
    try {
      e.preventDefault();

      console.log({ ...profile, avatar });

      mutate(
        {
          ...profile,
          image: avatar,
        },
        {
          onSuccess: () => {
            setIsEdit(false);
            refetch();
          },
          onError: (err) => {
            Promise.reject(err);
            return alert(err?.response?.data?.message);
          },
        }
      );
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center md:items-start md:px-24 py-10 overflow-y-auto gap-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      {isEdit ? (
        <div className="relative flex flex-col">
          <label
            htmlFor="image"
            className="relative w-[200px] h-[200px] rounded-full cursor-pointer">
            <img
              src={editAvatar || user?.avatar}
              alt="avatar"
              className="w-[200px] h-[200px] rounded-full"
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="appearance-none hidden"
            onChange={handleFile}
          />
          <div className="absolute rounded-full w-[200px] h-[200px] flex justify-center items-center bg-black bg-opacity-40 pointer-events-none">
            <FaPen className="text-xl text-white" />
          </div>
        </div>
      ) : (
        <figure>
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-[200px] h-[200px] rounded-full"
          />
        </figure>
      )}

      <form
        onSubmit={handleEdit}
        className="flex flex-col w-[80%] xl:w-[35%] gap-5">
        <TextField
          name="name"
          label="Nama"
          value={profile?.name}
          disabled={!isEdit}
          onChange={(e) => {
            setProfile({
              ...profile,
              name: e.target.value,
            });
          }}
        />
        <TextField
          name="email"
          label="Email"
          value={profile?.email}
          disabled={!isEdit}
          onChange={(e) => {
            setProfile({
              ...profile,
              email: e.target.value,
            });
          }}
        />
        <TextField
          name="phone_number"
          label="No. HP"
          value={profile?.phone_number}
          disabled={!isEdit}
          onChange={(e) => {
            setProfile({
              ...profile,
              phone_number: e.target.value,
            });
          }}
        />
        <TextField
          name="address"
          label="Address"
          value={profile?.address}
          isTextArea
          disabled={!isEdit}
          onChange={(e) => {
            setProfile({
              ...profile,
              address: e.target.value,
            });
          }}
        />
        {isEdit && (
          <Fragment>
            <Button type="submit" loading={status === "pending"}>
              Simpan
            </Button>
            <Button type="button" onClick={() => setIsEdit(false)}>
              Batal
            </Button>
          </Fragment>
        )}
      </form>
      {!isEdit && (
        <div className="flex w-[60%] xl:w-[35%]">
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        </div>
      )}
    </section>
  );
};
