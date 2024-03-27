import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"

export default function formatDate(data){
    return formatDistanceToNow(new Date(data), { addSuffix: true, locale: ptBR })
}