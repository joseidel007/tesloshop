import {
    BeforeInsert, BeforeUpdate, Column, Entity,
    ManyToOne,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { ProductImage } from './produc-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: 'a5669c08-eda5-47f6-8d74-816b5b5cee09',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty(
        {
            example: 'T-Shirt Teslo',
            description: 'Product Title',
            uniqueItems: true
        }
    )
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty(
        {
            example: 0.0,
            description: 'Product price',
            default: 0
        }
    )
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty(
        {
            example: 'Anim  reprebenderit is anim mollit minim irure commodo.',
            description: 'Product description',
            default: null
        }
    )
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty(
        {
            example: 't_shirt_teslo',
            description: 'Product SLUG - for SEO',
            default: null
        }
    )
    @Column('text', {
        unique: true
    })
    slug: string


    @ApiProperty({
        example: 10,
        description: 'Product stuck',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M', 'XL', 'S'],
        description: 'Product sizes',
        default: 0
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['tshirt'],
        description: 'Product tags',
        default: []
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: false }
    )
    user: User
    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')

    }


    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

}
