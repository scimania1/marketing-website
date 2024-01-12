import Modal from "./modal";

export default async function ProductModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Modal id={id}>{id}</Modal>;
}
