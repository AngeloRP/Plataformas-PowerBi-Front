import { SidebarElement } from 'app/shared/layout/navigation/sidebar-element.interface';

export class SidebarElementClass {
    element: SidebarElement;

    constructor(sidebarElement: SidebarElement) {
        this.element = sidebarElement;
    }

    addChildsIndicadores(childs: any[]) {
        const nuevosChilds = new Array<SidebarElement>();
        let estado = 'not-active';
        for (const child of childs) {
            if (child.estado_activo !== 1) {
                estado = 'not-active';
            } else {
                estado = '';
            }
            nuevosChilds.push(
                {
                    id: 'indicadores-' + child.month_id,
                    link: { commands: ['/incubado/indicadores/indicador/' + child.month_id], extras: child.month_id },
                    title: child.titulo,
                    clase_menu: estado,
                    imagen: 'fa fa-lg fa-fw fa-calendar',
                    class: estado,
                    hasChilds: false
                }
            );

        }
        this.element.childs = nuevosChilds;
    }

    addChildsEvaluaciones(childs: any[]) {
        const nuevosChilds = new Array<SidebarElement>();
        let estado = 'not-active';
        let mesesActivos = '';
        for (const child of childs) {
            if (child.estado_activo !== 1) {
                estado = 'not-active';
            } else {
                estado = '';
                mesesActivos += child.month_id + ',';
            }
            nuevosChilds.push(
                {
                    id: 'evaluaciones-' + child.month_id,
                    link: { commands: ['/incubado/evaluaciones/evaluacion/' + child.month_id], extras: child.month_id },
                    title: child.titulo,
                    clase_menu: estado,
                    imagen: 'fa fa-lg fa-fw fa-calendar',
                    class: estado,
                    hasChilds: false
                }
            );

        }
        mesesActivos = mesesActivos.substring(0, mesesActivos.length - 1);
        window.localStorage.setItem('meses-activos', mesesActivos);
        this.element.childs = nuevosChilds;
    }
}
