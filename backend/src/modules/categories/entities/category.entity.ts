import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common";
import slugify from "slugify";

@Entity('categories')
export class Category extends BaseEntity{
  
  @Column('varchar', {
    length: 80,
    unique: true
  })
  name: string;

  @Column('text', {
    unique: true
  })
  slug: string;

  @BeforeInsert()
  generateSlugInsert?() {
    this.slug = slugify(this.name).toLowerCase().trim();
  }

  @BeforeUpdate()
  generateSlugUpdate?() {
    this.slug = slugify(this.name).toLowerCase().trim();
  }


}
