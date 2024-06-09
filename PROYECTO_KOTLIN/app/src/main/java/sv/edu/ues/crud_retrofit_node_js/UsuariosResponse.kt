package sv.edu.ues.crud_retrofit_node_js

import com.google.gson.annotations.SerializedName

data class UsuariosResponse (
    @SerializedName("listaUsuarios") var listaUsuarios: ArrayList<Usuario>
)